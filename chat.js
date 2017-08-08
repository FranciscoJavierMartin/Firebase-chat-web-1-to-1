class Chat{
	constructor(roomKey,user,containerID,database){
		this.user=user;
		this.id=roomKey;
		this.database=database;
		this.build_chat(containerID)
		this.set_events()
	}

	build_chat(containerID){
		$.tmpl($("#hidden-template"),{id: this.id})
			.appendTo("#"+containerID)

		this.ref=this.database.ref("/messages/"+this.id)
	}

	set_events(){
		$("#"+this.id).find("form").on("submit",(ev)=>{
			ev.preventDefault()
			
			var msg=$(ev.target).find(".mensaje").val()
			this.send(msg)

			return false;
		})
	}

	send(msg){
		this.ref.push({
			name:this.user.displayName || this.user.email,
			roomID: this.id,
			msg: msg
		})
	}
}