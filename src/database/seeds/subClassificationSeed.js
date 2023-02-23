exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("subClassification")
      .del()
      .then(() =>
        // Inserts seed entries
        knex("subClassification").insert([
          {
            
            id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9bg",
            classification_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9be",          
            name: "Eletromagnetismo",
            description: "Área que estuda fenômenos eltromagnéticos",         
          },
          {
            
            id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9bl",
            classification_id: "230af1d7-1dd3-48f5-99ed-5cf50da7a9bj",          
            name: "Óptica",
            description: "Área que estuda fenômenos ópticos",          
          },
        ])
      );
  };
  