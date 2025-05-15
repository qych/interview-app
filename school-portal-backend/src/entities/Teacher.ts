import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Class } from "./Class";

// TODO #6: Link teacher to classes. Every class must be assigned 1 teacher as form teacher

@Table
export class Teacher extends Model {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  override id!: number;

  @Column({
    type: DataType.STRING(21),
    unique: true,
    allowNull: false
  })
  uuid!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  subject!: string;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING(8),
    allowNull: false
  })
  contactNumber!: string;
}
