import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Review } from "./review";

@Entity()
export class School {

    @PrimaryGeneratedColumn()
    public schoolId!: number;

    @Column()
    public schoolName!: string;

    @Column()
    public website!: string;

    // One to many relationship to entity Review
    @OneToMany(type => Review, review => review.school)
    reviews!: Review[];
}
