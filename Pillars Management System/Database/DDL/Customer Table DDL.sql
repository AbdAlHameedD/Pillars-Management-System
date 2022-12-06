-- Start Code

CREATE TABLE Customer(
	ID INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
	Email VARCHAR(320) UNIQUE NOT NULL,
	Full_Name VARCHAR(60) NOT NULL,
	Gender VARCHAR(6) CHECK(Gender IN ('male', 'female')),
	BoD TIMESTAMP,
	Creation_Date TIMESTAMP DEFAULT(CURRENT_DATE) NOT NULL
);

-- End Code