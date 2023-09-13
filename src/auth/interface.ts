export enum Role {
    Admin = 'admin',
    Employee = 'employee'
}

export const permission = {
    admin: [1,2,3,4], 
    employee: [1,2,3,4]
};

// export const permissions: string[] = [
//     'createUser','listUser','updateUser','deleteUser','createCompany','listCompany','updateCompany','deleteCompany','userProfile'
// ]

export const permissions: Object = {
    user: ['createUser','listUser','updateUser','deleteUser','userProfile','setCompany','assignRole'],
    company: ['createCompany','listCompany','updateCompany','deleteCompany'],
    role: ['createRole', 'listRole', 'updateRole', 'deleteRole'],
    document: ['createDocument','listDocument'],
    macId: ['createMacId', 'listMacId', 'updateMacId', 'deleteMacId']
}