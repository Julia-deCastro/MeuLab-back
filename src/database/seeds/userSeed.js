exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("user")
      .del()
      .then(() =>
        // Inserts seed entries
        knex("user").insert([
          {
            
            id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9be",           
            name: "Julia",         
            email: "julia5@gmail.com",
            user_name: "Julia",
            password: "4ccb855b9fc165fa",
            profession: "Estudante",
            instituition: "UFMG",
            type_instituition: "public",
            country: "Brasil",
            state: "MG",
            city: "BH",
            purpose_use: "Para realizar experimentos",
            status: 0,
            aprove: 0,
          },
          {
            
            id: "39485045-c510-47b4-9358-fc5ddbf51d63",                     
            name: "Julia",          
            email: "julia6@gmail.com",
            user_name: "Julia",
            password: "1f0285996bb2f062", 
            profession: "Estudante",
            instituition: "UFMG",
            type_instituition: "public",
            country: "Brasil",
            state: "MG",
            city: "BH",
            purpose_use: "Para realizar experimentos",
            status: 0,
            aprove: 0,
          },
        ])
      );
  };
  