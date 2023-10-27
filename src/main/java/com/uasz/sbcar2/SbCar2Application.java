package com.uasz.sbcar2;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.uasz.sbcar2.domain.*;

@SpringBootApplication
public class SbCar2Application implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(SbCar2Application.class);

	@Autowired
	private CarRepository repository;

	@Autowired
	private OwnerRepository orepository;

	@Autowired UserRepository urepository;

	public static void main(String[] args) {
		SpringApplication.run(SbCar2Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception{

		Owner owner1 = new Owner("Max", "Verstapen");
		Owner owner2 = new Owner("Jamal","Musiala");
		orepository.saveAll(Arrays.asList(owner1,owner2));

		Car car1 = new Car("Ford", "Mustang", "rouge", "ADF-1121",2021,59000,owner2);		
		Car car2 = new Car("Nissan", "Leaf", "blanc", "SSJ-3002",2019,29000,owner2);		
		Car car3 = new Car("Toyota", "Prius", "silver", "KKO-0212",2020,39000,owner1);
		Car car4 = new Car("Ferrari", "260-kali", "rouge", "AAO-2410",2012,76020,owner1);
		Car car5 = new Car("Jaguar", "demin", "noir", "zci-1456",2023,69300,owner2);
		Car car6 = new Car("RolceRoyce", "Culiman", "silver", "KKO-0212",2021,39000,owner1);
		Car car7 = new Car("Chevrolet", "Camarro", "jaune-noir", "FDG-0657",2014,69950,owner1);
		Car car8 = new Car("Lambourghini", "358-G", "jaune", "GSH-6734",2018,83040,owner2);
		Car car9 = new Car("BMW", "X6", "bleu", "HGG-7603",2016,49050,owner1);
		Car car10 = new Car("RedBullRacing", "RB19", "rouge-jaune-noir", "DFS-6883",2023,39000,owner2);
		repository.saveAll(Arrays.asList(car1,car2,car3,car4,car5,car6,car7,car8,car9,car10));

		for (Car car : repository.findAll()){
			logger.info(car.getBrand()+" "+car.getModel());
		}

		urepository.save(new User("user", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue","USER"));

		urepository.save(new User("admin", "$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
	}


}
