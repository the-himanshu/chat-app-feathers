// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from 'sequelize';
import { Application } from '../declarations';
import { HookReturn } from 'sequelize/types/lib/hooks';

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: "Bio Empty"
    },
    friends: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    friendsList: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    pendingSentRequests: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    pendingReceivedRequests: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    requestsReceived: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    googleId: { type: DataTypes.STRING },
  
  }, {
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (users as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return users;
}
