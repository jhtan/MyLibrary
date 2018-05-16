import r from 'rethinkdb';
import initRehinkdb from 'rethinkdb-init';
import rConf from './config'
new initRehinkdb(r);

r.init(rConf,[
	{
		name: 'sessions',
		primary: 'sid',
		indexes: ['createdAt','name']
	}
]);

// export r;