exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("adm")
      .del()
      .then(() =>
        // Inserts seed entries
        knex("adm").insert([
          {
            
            id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9be",           
            name: "Julia",         
            email: "juliaa5@gmail.com",
            user_name: "Julia",
            password: "4ccb855b9fc165fa",
          },
          {
            
            id: "39485045-c510-47b4-9358-fc5ddbf51d63",                     
            name: "Julia",          
            email: "juliaao6@gmail.com",
            user_name: "Julia",
            password: "1f0285996bb2f062", 
          },
        ])
      );
  };
  