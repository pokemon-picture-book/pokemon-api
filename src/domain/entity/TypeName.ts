/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import Language from './Language';
import Type from './Type';

@Entity({ name: 'type_names' })
class TypeName extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 60
    })
    name: string = '';

    @ManyToOne(
        () => Type,
        type => type.typeNames
    )
    @JoinColumn({
        name: 'type_id'
    })
    type: Type;

    @ManyToOne(
        () => Language,
        language => language.typeNames
    )
    @JoinColumn({
        name: 'language_id'
    })
    language: Language;

    public refer(): void {
        console.table(this);
    }
}

export default TypeName;
