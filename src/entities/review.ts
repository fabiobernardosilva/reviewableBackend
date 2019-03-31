import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { School } from "./school";

//THIS IS A TEST.
@Entity()
export class Review {

@PrimaryGeneratedColumn()
public reviewId!: number;

@Column()
public reviewerName!: string;

@Column()
public email!: string;

@Column()
public dOB!: string;

/*
@Column()
public school!: string;
*/

@Column()
public recommendation!: boolean;

@Column()
public teacher!: string;

@Column()
public facilities!: string;

@Column()
public staff!: string;

@Column()
public comment!: string // CHECK

@ManyToOne(type => School, school => school.reviews)
school!: School;

}