angular.module('SearchController', ['DataService']).controller('SearchController', function($scope, $rootScope, $location, $http, dataService) {
	
	$scope.results = [];
    $scope.mysearch = '';
	
	$scope.isPremium = (sessionStorage.getItem('isPremium') == 'true');
	
	function isEmpty( obj ) {
		console.log("in isEmpty()");
		for ( var prop in obj ) { 
			if ( obj[prop] !== "" && obj.hasOwnProperty( prop )) { return false; }
		}
		return true;
	}
	
	function getSkillList(skillString){
		var skillList = [];
		skillSearch = skillString.split(",")     // to split skills into array
		skillSearch.forEach(function(skillObjString){
			var skillProperty = skillObjString.trim().split(' ');
			var skillObj = {};
			
			
			//skillObj.endorsement = 0;
			skillObj.skillLevel = 0;
			skillObj.skillName = '';
			
			switch(skillProperty.length){
				case 3:
					skill.endorsement = skillProperty[2];
				case 2:
					skillObj.skillLevel = skillProperty[1];
				case 1:
					skillObj.skillName = skillProperty[0];
					break;
				default:
			}
			
			if(skillProperty[0] != ''){	
				skillList.push(skillObj);
			}
		});
		return skillList;
	}
	
	function getEducationList(eduString){
		var eduList = [];
		var eduSearch = eduString.split(",")     // to split skills into array
		/*eduSearch.forEach(function(eduObjString){
			var skillProperty = skillObjString.trim().split(' ');
			var skillObj = {};
			switch(skillProperty.length){
				case 3:
					//currently not supported.
					//skill.endorsement = skillProperty[2];
				case 2:
					skillObj.skillLevel = skillProperty[1];
				case 1:
					skillObj.skillName = skillProperty[0];
					break;
				default:
			}
			skillList.push(skillObj);	
		});*/
		eduList.push({schoolName: eduString});
		return eduList;
	}
	
    $scope.handleSubmit = function(criteria) {
		//check for empty form
		if(isEmpty(criteria)){
			// $scope.mysearch = 'ERROR: CANNOT LEAVE FIELDS EMPTY';
			toastr.error('Error: cannot leave fields empty');
		}else{
			
			var searchObj = {};
			Object.keys(criteria).forEach(function(key, index){
				if(criteria[key] !== ''){
					searchObj[key] = criteria[key];
				}
			});
			
			delete searchObj.educationString;
			delete searchObj.skillString;
			
			//build the array of skill
			if(criteria.hasOwnProperty("skillString")){	
				searchObj.skills = getSkillList(criteria.skillString);
				if(searchObj.skills.length == 0) delete searchObj.skills
			}
			if(criteria.hasOwnProperty("educationString")){	
				searchObj.education = getEducationList(criteria.educationString);
				if(searchObj.education.length == 0) delete searchObj.education
			}
		console.log(searchObj);	
			
			dataService.performSearch(searchObj).then(function(data){
				if ((data.resultList).length == 0) {
					$scope.mysearch = 'No Matches Found';
				} else {
					$scope.mysearch = 'Search Results: ' + (data.resultList).length;
				}
				
				$scope.results = [];			
				var i = 0;
				for (i = 0; i < (data.resultList).length ;i++) {
					var obj = { _id: data.resultList[i]._id,
								name: data.resultList[i].name,
								jobTitle: data.resultList[i].jobTitle,
								company: data.resultList[i].company};
					$scope.results.push(obj);
				}
			});
		}
	}
	
	$scope.visitProfile = function(data){
		console.log(data._id);
		$location.path('/viewprofile/' + data._id);
	}

});