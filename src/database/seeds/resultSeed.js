exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("result")
      .del()
      .then(() =>
        // Inserts seed entries
        knex("result").insert([
          {
            
            id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9dw",           
            schedule_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a998",         
            result: "230af1d7-1dd3-48f5-99ed",
        },
          {
            
            id: "39485045-c510-47b4-9358-fc5ddbf51dfr",                     
            schedule_id: "39485045-c510-47b4-9358-fc5ddbf51dmj",          
            result: "230af1d7-1dd3-48f5-99ed",
        },
        ])
      );
  };
  