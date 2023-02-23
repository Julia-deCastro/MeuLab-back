exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("experiment")
      .del()
      .then(() =>
        // Inserts seed entries
        knex("experiment").insert([
          {
            
            id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9fg",           
            title: "Balão sobre cama de pregos",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using",   
            classification: "230af1d7-1dd3-48f5-99ed-5cf50da7a9bg",
            instructions: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using",
            images: "230af1d7-1dd3-48f5-99ed",
            featured: 0,
            exemplary: 1,
            server_ip: "127.0.0.1",
            server_port: 80,
            stream_link: "youtube.com",
            duration: "0:15:0",
            disponibility: 1,
        },
          {
            
            id: "39485045-c510-47b4-9358-fc5ddbf51d55",                     
            title: "Esferas de Newton",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using",   
            classification: "230af1d7-1dd3-48f5-99ed-5cf50da7a9bg",
            instructions: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using",
            images: "230af1d7-1dd3-48f5-99ed",
            featured: 0,
            exemplary: 1,
            server_ip: "127.0.0.2",
            server_port: 80,
            stream_link: "youtube.com",
            duration: "0:15:0",
            disponibility: 1,        
          },
        ])
      );
  };
  