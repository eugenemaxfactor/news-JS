import Loader from './loader';

function requireEnvironmentVariable(value: string | undefined, name: string): string {
    if (!value || value === 'MISSING_ENV_VAR') {
        throw new Error(`${name} environment variable is required`);
    }

    return value;
}

const apiUrl = requireEnvironmentVariable(process.env.API_URL, 'API_URL');
const rawApiKey = process.env.API_KEY;
const apiKey = !rawApiKey || rawApiKey === 'MISSING_ENV_VAR' ? '' : rawApiKey;

class AppLoader extends Loader {
    public constructor() {
        super(apiUrl, {
            apiKey,
        });
    }
}

export default AppLoader;
