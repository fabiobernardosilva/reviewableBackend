import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { School } from "./school";

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    public reviewId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_DATE' })
    public time!: Date;

    @Column()
    public reviewerName!: string;

    @Column()
    public email!: string;

    @Column()
    public dOB!: string;

    // This is a boolean -1, 0 and 1 values
    @Column()
    public recommendation!: number;

    // Will receive 1 to 5 values
    @Column()
    public teacher!: number;

    // Will receive 1 to 5 values
    @Column()
    public facilities!: number;

    // Will receive 1 to 5 values
    @Column()
    public staff!: number;

    // Optional field, with ? decorator
    @Column()
    public comment?: string;

    // This is a boolean -1, 0 and 1 values
    @Column()
    public verificationStatus!: number;

    // This is a boolean -1, 0 and 1 values
    @Column({ nullable: true })
    public postStatus!: number;

    // Optional field
    @Column({ nullable: true })
    public schoolResponseToComment?: string;

    // Many to one relationship to entity School
    @ManyToOne(type => School, school => school.reviews)
    school!: School;

}