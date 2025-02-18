import Table, {Columns, SortDirection} from "../../../components/ui/Table.tsx";
import users from "../data/users.json";

type User = (typeof users)[number];
const userColumns: Columns<User> = [
    {
        label: 'ID',
        key: 'id',
        renderCell: (user: User) => user.id,
        comparator: (
            a: User,
            b: User,
            direction: SortDirection,
        ) => (direction === 'asc' ? a.id - b.id : b.id - a.id),
        filterType: null,
    },
    {
        label: 'Name',
        key: 'name',
        renderCell: (user: User) => user.name,
        comparator: (
            a: User,
            b: User,
            direction: SortDirection,
        ) =>
            direction === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name),
        filterType: 'string',
    },
    {
        label: 'Age',
        key: 'age',
        renderCell: (user: User) => user.age,
        comparator: (
            a: User,
            b: User,
            direction: SortDirection,
        ) =>
            direction === 'asc' ? a.age - b.age : b.age - a.age,
        filterType: 'range',
    },
    {
        label: 'Occupation',
        key: 'occupation',
        renderCell: (user: User) => user.occupation,
        comparator: (
            a: User,
            b: User,
            direction: SortDirection,
        ) =>
            direction === 'asc'
                ? a.occupation.localeCompare(b.occupation)
                : b.occupation.localeCompare(a.occupation),
        filterType: 'string',
    },
];


function TaskTable() {
    return (
        <>
            <Table data={users} columns={userColumns}/>
        </>
    )
}

export default TaskTable;
