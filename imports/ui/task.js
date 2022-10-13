import { Template } from 'meteor/templating';

import { Tasks } from "../api/TasksCollections";

import './Task.html';

Template.task.events({

    
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {
      $set: { isChecked: !this.isChecked },
     
    });

  },
  
  
});


