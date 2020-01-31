var mongoose = require("mongoose");
var Guide = require("./models/guide");
// var Comment   = require("./models/comment");
 
var data = [
    {
        firstName: "RICHA",
		lastName: "KOHLI",
		email: "abc@gmail.com",
		password: "11223344",
		phone: "9988456342",
		location: "Ashok Vihar"
    },
    {
        firstName: "TANISHA",
		lastName: "SHARMA",
		email: "123@gmail.com",
		password: "123456",
		phone: "9988543267",
		location: "Janakpuri"
    },
    {
        firstName: "DEEPANSHI",
		lastName: "GUPTA",
		email: "xyz@gmail.com",
		password: "abc3344",
		phone: "9875670452",
		location: "Tilak nagar"
    },{
		firstName: "SHILPA",
		lastName: "KOHLI",
		email: "BCD@gmail.com",
		password: "1ABC3344",
		phone: "8765687490",
		location: "Pitampura"
		
	},{
		firstName: "HEENA",
		lastName: "KHAN",
		email: "SRT@gmail.com",
		password: "5566TYU",
		phone: "4567388923",
		location: "Vikaspuri"
		
	},{
		firstName: "PRIYA",
		lastName: "KUMARI",
		email: "MNL@gmail.com",
		password: "1MNL3344",
		phone: "8765634580",
		location: "Motinagar"
		
	}
]
 
function seedDB1(){
   //Remove all campgrounds
   Guide.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed guides!");
	  
    // Comment.remove({}, function(err) {
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log("removed comments!");
		
             //add a few campgrounds
    data.forEach(function(seed){
                Guide.create(seed, function(err, guide){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a guide");
					}
				});
	});
						
                        //create a comment
    // Comment.create(
    //                         {
    //                             text: "This place is great, but I wish there was internet",
    //                             author: "Homer"
    //                         }, function(err, comment){
    //                             if(err){
    //                                 console.log(err);
    //                             } else {
    //                                 campground.comments.push(comment);
    //                                 campground.save();
    //                                 console.log("Created new comment");
    //                             }
    //                         });
    //                 }
    //             });
    //         });
    //     });
    }); 
    //add a few comments
}
 
module.exports = seedDB1;