// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const posts = sequelizeClient.define('posts', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (posts as any).associate = function (models: any): void {
    posts.belongsTo(models.users, {
      foreignKey: 'createdBy',
      targetKey: 'id',
    });
    posts.hasMany(models.comments, {
      foreignKey: 'postId',
    });
  };

  return posts;
}
