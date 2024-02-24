function fetchAndDisplayVillagers() {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      const villagers = JSON.parse(xhr.responseText);
      const villagersList = document.getElementById('list');

      villagers.forEach(villager => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        const image = document.createElement('img');
        const villagerItem = document.createElement('div');

        villagerItem.classList.add('item');

        link.href = villager.link;
        link.textContent = villager.title;
        
        image.src = villager.avatar;
        image.alt = villager.title;

        link.appendChild(image);
        villagerItem.appendChild(link);
        listItem.appendChild(villagerItem);
        villagersList.appendChild(listItem);
      });
    } else if (xhr.readyState === 4) {
      console.log('Failed to fetch villagers:', xhr.status);
    };
  };

  xhr.open('GET', 'http://localhost:3333/villagers', true);
  xhr.send();
};

function fetchAndDisplayAnimals() {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      const animals = JSON.parse(xhr.responseText);
      const animalsList = document.getElementById('list');

      animals.forEach(animal => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        const image = document.createElement('img');
        const animalItem = document.createElement('div');

        animalItem.classList.add('item');

        link.href = animal.link;
        link.textContent = animal.name;

        image.src = animal.image;
        image.alt = animal.name;

        link.appendChild(image);
        animalItem.appendChild(link);
        listItem.appendChild(animalItem);
        animalsList.appendChild(listItem);
        
      })
    } else if (xhr.readyState === 4) {
      console.log('Failed to fetch villagers:', xhr.status);
    };
  };

  xhr.open('GET', 'http://localhost:3333/animals', true);
  xhr.send();
}

fetchAndDisplayVillagers();
fetchAndDisplayAnimals();