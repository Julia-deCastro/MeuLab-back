exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("favorite")
      .del()
      .then(() =>
        // Inserts seed entries
        knex("favorite").insert([
          {
            
            experiement_id: "39485045-c510-47b4-9358-fc5ddbf51d55",           
            user_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9be",         
          },
          {
            
            experiement_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9fg",                     
            user_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9be",          
          },
        ])
      );
  };
  