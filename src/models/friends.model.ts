// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const friends = sequelizeClient.define('friends', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    }
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (friends as any).associate = function (models: any): void {
    friends.belongsTo(models.users, {
      foreignKey: 'source',
      targetKey: 'id',
      as: 'sourceUser'
    }),
    friends.belongsTo(models.users, {
      foreignKey: 'target',
      targetKey: 'id',
      as: 'targetUser'
    });
  };

  return friends;
}
