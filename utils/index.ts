import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps){
  const { manufacturer, year, model, limit, fuel }= filters
 const headers = {
  'X-RapidAPI-Key': 'c1ea20e8d9msh7456d515e35d6c6p1990adjsn4eba4cb798cb',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
 }
 const response = await fetch (`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit${limit}&fuel_type${fuel}`, {
  headers: headers,
 });

 const result = await response.json();
 return result;
};
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 6350; // Base rental price per day in kenyan shillings
  const mileageFactor = 12.7; // Additional rate per mile driven
  const ageFactor = 6.35; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer','hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
}
export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};