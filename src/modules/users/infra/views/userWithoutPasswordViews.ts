import User from '@modules/users/infra/typeorm/entities/User';

export default {
  render(user: User): Record<string, unknown> {
    // Com a atualização do TypeScript, isso se faz necessário
    const withoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      evatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      cancelledAt: user.cancelledAt,
    };

    return withoutPassword;
  },
};
