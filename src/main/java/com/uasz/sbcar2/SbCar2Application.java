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

	public static void main(String[] args) {
		SpringApplication.run(SbCar2Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception{

		Owner owner1 = new Owner("Max", "Verstapen");
		Owner owner2 = new Owner("Jamal","Musiala");
		orepository.saveAll(Arrays.asList(owner1,owner2));

		Car car1 = new Car("Ford", "Mustang", "Red", "ADF-1121",2021,59000,owner2);		
		Car car2 = new Car("Nissan", "Leaf", "white", "SSJ-3002",2019,29000,owner2);		
		Car car3 = new Car("Toyota", "Prius", "silver", "KKO-0212",2020,39000,owner1);
		repository.saveAll(Arrays.asList(car1,car2,car3));

		for (Car car : repository.findAll()){
			logger.info(car.getBrand()+" "+car.getModel());
		}
	}


}
