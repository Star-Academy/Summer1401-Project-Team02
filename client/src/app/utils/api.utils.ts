export const BASE_URL = 'https://localhost:7113/';

export const API_UPLOAD_FILE = BASE_URL + 'DataInventory/AddSourceByFile';
export const API_SEND_DESTINATION_NAME = BASE_URL + 'DataInventory/AddDestination';
export const API_DOWNLOAD_FILE = BASE_URL + 'DataInventory/DownloadFile';
export const API_PREVIEW = BASE_URL + 'Pipeline/Preview';
export const API_GET_TABLES = BASE_URL + 'DataInventory/GetAllTables';
export const API_DELETE_TABLE = BASE_URL + 'DataInventory/DeleteDataset';

export const API_GET_COLUMNS_HEADING = BASE_URL + 'Pipeline/GetHeading';
export const API_EXECUTE = BASE_URL + 'Pipeline/Execute';

export const DEFAULT_POST_REQUEST_INIT: RequestInit = {
    method: 'post',
    headers: {},
};
