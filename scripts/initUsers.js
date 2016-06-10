"use presentation";
print("azaza");

var users = [];
var companies = [];

var phonePrefix = "+3063";

var names = ["Ivan", "Petro", "Yuriy", "Andriy", "Igor", "Sergiy", "Lyubomyr", "Roman"];
var lastNames = ["Ivanow", "Petrow", "Sergiychenko", "Lyubomyrchenko", "Petrenko", "Romanchenko", "Andriychenko"];
var domains = ["@yandex.ru", "@gmail.com", "@yahoo.com", "@i.ua"];

for (var i = names.length - 1; i >= 0; i--) {
	for (var j = lastNames.length - 1; j >= 0; j--) {
		users.push(generateUser(names[i], lastNames[j]));
	};
};

db.persons.insert(users);

populateCompanies();

db.companies.insert(companies);
printjson(companies);

function generateUser(firstName, lastName) {
	var object = new Object();
	object.firstName = firstName;
	object.lastName = lastName;

	var phoneNumber = phonePrefix;
	for (var i = 0; i < 7; i++) {
		phonePrefix + getRandomNumberInRange(0, 9);
	};

	object.phoneNumber = phoneNumber;
	object.email = firstName + "." + lastName + domains[getRandomNumberInRange(0, 3)];
	return object;
}

function getRandomNumberInRange(min, max) {
	return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

function populateCompanies() {
	var corporativeDomains = ["@eleks.com", "@edvantis.com", "@opera.com", "@soft-serve.com"];
	var companieNames = ["Eleks", "Edvantis", "Opera", "SoftServe"];

	var cities = ["Lviv", "Kyiv", "Odessa"];
	var streets = ["Chornovola", "Volodymyra Velykogo", "Gorodotska", "I. Franka", "Korotka", "Seredna", "Dovga"];

	var addresses;

	for (var i = 0; i < companieNames.length; i++) {
		var company = {};
		addresses = [];

		for (var j = 0; j < 10; j++) {
			var address = {};
			address.city = cities[getRandomNumberInRange(0, cities.length -1)];
			address.street = streets[getRandomNumberInRange(0, streets.length - 1)];
			address.number = getRandomNumberInRange(1, 200);
			addresses.push(address);
		};

		company.addresses = addresses;
		company.employees = [];

		company.name = companieNames[i];
		company.emails = ["info" + corporativeDomains[i], "jobs" + corporativeDomains[i], "ceo" + corporativeDomains[i]];

		companies.push(company);

	 }; 

	db.persons.find().forEach(function (document) {
		companies[getRandomNumberInRange(0, companies.length - 1)].employees.push(document._id);
	});
}