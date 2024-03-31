const nameCars = {
  brands: [
    'Toyota',
    'Ford',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Honda',
    'Nissan',
    'Chevrolet',
    'Volkswagen',
    'Kia',
    'Hyundai',
    'Porsche',
    'Subaru',
    'Tesla',
    'Volvo',
  ],
  models: [
    'Camry',
    'F-150',
    '3 Series',
    'S-Class',
    'A4',
    'Civic',
    'Altima',
    'Silverado',
    'Golf',
    'Sorento',
    'Sonata',
    '911',
    'Forester',
    'Model S',
    'XC90',
  ],
};

export function setRandomCarName(): string {
  const carBrand =
    nameCars.brands[Math.floor(Math.random() * nameCars.brands.length)];
  const carModel =
    nameCars.models[Math.floor(Math.random() * nameCars.models.length)];

  return `${carBrand} ${carModel}`;
}

export function setRandomCarColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }

  return color;
}
