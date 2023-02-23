exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("classification")
      .del()
      .then(() =>
        // Inserts seed entries
        knex("classification").insert([
          {
            
            id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9be",           
            name: "Física",         
          },
          {
            
            id: "39485045-c510-47b4-9358-fc5ddbf51d63",                     
            name: "Biologia",          
          },
        ])
      );
  };
  