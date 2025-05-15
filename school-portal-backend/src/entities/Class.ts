import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Teacher } from "./Teacher";

// TODO #6: Link teacher to classes. Every class must be assigned 1 teacher as form teacher

@Table
export class Class extends Model {

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
    unique: true,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  level!: string;
}
