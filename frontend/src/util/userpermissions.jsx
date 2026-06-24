import { authUser } from "../context/tokencontext";

const ROLES = {
  admin: {
    create_player: true,
    update_player: true,
    delete_player: true,
    create_article: true,
    update_article: true,
    delete_article: true,
  },
  player: {},
  coach: {},
  editor: {
    create_player: true,
    update_player: true,
    create_article: true,
    update_article: true,
  },
  evaluator: {
    create_player: true,
    update_player: true,
    create_article: true,
    update_article: true,
  },
};

export function hasPermission(userRole, permission) {
  const role = userRole?.toLowerCase();
  return role ? ROLES[role][permission] : false;
}
