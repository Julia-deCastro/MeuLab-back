exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("comment")
      .del()
      .then(() =>
        // Inserts seed entries
        knex("comment").insert([
          {
            
            id: "230af1d7-1dd3-48f5-99ed-5cf50da7ades",           
            user_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9be",
            text: "Adoro o sistema, tem me ajudado muito",
            favorite: 0, 
          },
          {
            
            id: "39485045-c510-47b4-9358-fc5ddbf51fes",                     
            user_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9be",
            text: "Adoro o sistema, tem me ajudado muito",
            favorite: 1,        
          },
        ])
      );
  };
  