/* eslint import/extensions: 0 */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    Index,
} from 'typeorm';
import LanguageEntity from './Language.entity';
import TypeEntity from './Type.entity';

@Entity({ name: 'type_names' })
@Index(['type', 'language'])
class TypeNameEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({
        type: 'varchar',
        length: 60,
    })
    readonly name: string = '';

    @ManyToOne(() => TypeEntity, (type) => type.typeNames)
    @JoinColumn({
        name: 'type_id',
    })
    @Index()
    readonly type: TypeEntity;

    @ManyToOne(() => LanguageEntity, (language) => language.typeNames)
    @JoinColumn({
        name: 'language_id',
    })
    @Index()
    readonly language: LanguageEntity;

    public refer(): void {
        console.table(this);
    }
}

export default TypeNameEntity;
