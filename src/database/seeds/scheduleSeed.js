exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('schedule')
      .del()
      .then(() =>
        // Inserts seed entries
        knex("schedule").insert([
          {
            
            id: "230af1d7-1dd3-48f5-99ed-5cf50da7a998",           
            experiment_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9fg",
            user_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9be",
            date: "2023-04-05",
            hour: "08:00:00",
            wating_confirmation: 0,
            status: "done",     
          },
          {
            
            id: "39485045-c510-47b4-9358-fc5ddbf51dmj",                     
            experiment_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9fg",
            user_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9be",
            date: "2023-04-05",
            hour: "08:00:00",
            wating_confirmation: 0,
            status: "done",               
          },
        ])
      );
  };
  