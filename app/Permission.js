const Permission = {
  hasRole: (member, role) => {
    if (member.guild == null) return true
    return member.roles.find('name', role) !== null
  }
}

module.exports = Permission
