
function menu(type){
	var all_msg=document.getElementById('all-msg');
	var new_msg=document.getElementById('new-msg');
	var unread_msg=document.getElementById('unread-msg');
	switch(type){
		case 'all':
			all_msg.style.display='block';
			new_msg.style.display='none';
			unread_msg.style.display='none';
			break;
		case 'new':
			all_msg.style.display='none';
			new_msg.style.display='block';
			unread_msg.style.display='none';
			break;
		case 'unread':
			all_msg.style.display='none';
			new_msg.style.display='none';
			unread_msg.style.display='block';
			break;
		default:
			all_msg.style.display='block';
			new_msg.style.display='none';
			unread_msg.style.display='none';
	}
};

function closeFrame(obj) {
	document.getElementById(obj).style.display = 'none';
};

function openNewFrame(obj) {
	document.getElementById(obj).style.display = 'block';
};