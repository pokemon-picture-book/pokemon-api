/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';
import Language from './Language.entity';
import Type from './Type.entity';

@Entity({ name: 'type_names' })
class TypeName extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({
        type: 'varchar',
        length: 60
    })
    readonly name: string = '';

    @ManyToOne(
        () => Type,
        type => type.typeNames
    )
    @JoinColumn({
        name: 'type_id'
    })
    readonly type: Type;

    @ManyToOne(
        () => Language,
        language => language.typeNames
    )
    @JoinColumn({
        name: 'language_id'
    })
    readonly language: Language;

    public refer(): void {
        console.table(this);
    }
}

export default TypeName;
