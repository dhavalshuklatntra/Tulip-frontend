const endpoints = {
  login: {
    login: 'Authentication',
    logout: 'Authentication/sign-out',
  },
  signup: {
    signup: 'AppConfigUsers',
    emailConfirmation: 'Authentication/confirm-email',
    verifyEmail: 'AppConfigUsers/ResendSignupEmail',
  },
  forgotPassword: 'Authentication/Forgotpassword',
  resetPassword: 'Authentication/Resetpassword',
  emailConfirmation: 'Authentication/confirm-email',
  country: 'https://countriesnow.space/api/v0.1/countries/iso',
  tanent: 'TenantConfig',
  userData: '/Authentication/Get-User-Info',
  feedback: {
    feedBackSend: 'FeedBack/FeedBackSend',
  },
  mentorRequest: {
    mentorReq: 'RequestForMentor',
  },
  rolesPermission: 'RolePermission/GetByRoles',
  challenge: {
    challengeFilter: 'ChallengeList/GetChallengeFilterCount',
    challengeHeader: 'ChallengeList/GetChallengeListDashboardCount',
    challengeListing: 'ChallengeList',
    challengeSubmit: 'Challenge/SubmitChallenge',
  },
  UserManagement: {
    userList: 'AppConfigUsers',
    sentInvite: 'EmailSetupConfig/SendInviteEmail',
    updateStatus: 'AppConfigUsers/UpdateUserStatus',
    userListSearch: 'AppConfigUsers/UserByValue',
    rolesList: (id) => `UserRole/${id}`,
    updateRole: 'UserRole',
    usercareer: (ugid) => `UserCareerPath/UserCareerById?id=${ugid}`,
    updateCareer: 'UserCareerPath',
  },
  RoleManagement: {
    roleList: 'Role',
    updateStatus: 'Role/UpdateRoleStatus',
    permissionById: (id) => `RolePermission/${id}`,
    permission: 'RolePermission',
    modules: 'Module',
  },
  EmailConfig: {
    emailConfig: 'EmailSetupConfig',
  },
  DepartmentManagement: {
    departmentList: 'departments',
    careerPathByDepartment: (deptId) =>
      `CareerPath/ByDepartment?departmentId=${deptId}`,
    jobtitleByCareer: (careerId) => `CareerPath/ByJobTitles?id=${careerId}`,
  },
}

export default endpoints
