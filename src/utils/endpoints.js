export const fetchAllQueries='http://52.66.198.160:3018/api/v1/queries/all_queires';

//this api is to fetch all the stationary Points of a particular user via token
export const fetchAllStationaryPoints='http://52.66.198.160:3018/api/v1/adminPanel/User/getAllStationaryPoints';

//this api is to fetch all the stationary Points in dataBase (only for Master admin)
export const fetchAllStationaryPoints_FOR_ADMIN='http://52.66.198.160:3018/api/v1/adminPanel/MasterAdmin/get-all-stationaryPoints';

export const fetchAllStationaryPointsbyID_FOR_ADMIN='http://52.66.198.160:3018/api/v1/adminPanel/MasterAdmin/get-stationaryPoints-byID/';

export const adminLogin='http://52.66.198.160:3018/api/v1/admin/login';

export const fetchAllUsers='http://52.66.198.160:3018/api/v1/adminPanel/MasterAdmin/get-users';

//this api is to fetch all the playlists of a particular user via token
export const fetchAllPlaylists='http://52.66.198.160:3018/api/v1/adminPanel/User/getAllPlaylist';

export const fetchAllPlaylistsbyID_FOR_ADMIN='http://52.66.198.160:3018/api/v1/adminPanel/MasterAdmin/get-playlists-byID/';

//this api is to fetch all one Playlist in dataBase (only for admin)
export const fetchOnePlaylistsbyID_FOR_ADMIN='http://52.66.198.160:3018/api/v1/adminPanel/MasterAdmin/get-onePlaylist-byID/';

//this api is to fetch one playlist of a particular user via token
export const fetchAllPlaylistsbyID='http://52.66.198.160:3018/api/v1/adminPanel/User/get-onePlaylist-byID/';

//this api is to fetch all the Playlists in dataBase (only for admin)
export const fetchAllPlaylists_FOR_ADMIN='http://52.66.198.160:3018/api/v1/adminPanel/MasterAdmin/get-all-playlists';

//this api is to create playlist via userid in params(only for Master admin)
export const createPlaylist_FOT_ADMIN='http://52.66.198.160:3018/api/v1/adminPanel/MasterAdmin/create-playlist/';
//this api is to create playlist via _id in params(only for admin)
export const updatePlaylist_FOT_ADMIN='http://52.66.198.160:3018/api/v1/adminPanel/MasterAdmin/update-playlist/';

//this api is to create playlist(for users)
export const createPlaylist='http://52.66.198.160:3018/api/v1/adminPanel/User/create-playlist';
//this api is to create playlist via _id in param (for user)
export const updatePlaylist='http://52.66.198.160:3018/api/v1/adminPanel/User/update-playlist/';