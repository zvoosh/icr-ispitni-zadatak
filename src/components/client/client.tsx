import { IClient } from "../../types"

const Client = ({ client }: { client: IClient }) => {

    const startFunc = () => {
        if (client && client.password) {
            const stars = [];
            while (client.password.length > stars.length) {
                stars.push('*')
            }
            return stars;
        }
    }

    const favoriteRegionsHook = () => {
        if (client && client.favoritePlace) {
            return client.favoritePlace.map((i: any, index: number) => {
                return (
                    <span key={index}> {i} {client.favoritePlace.length > index + 1 ? ' | ' : ''} </span>
                )
            })
        }
        return '-';
    }

    return (<>
        <div className="wrappingDiv">
            <div style={{ margin: '5px' }}>
                <span className="clientSectionTitle">Client</span>
            </div>
            <div className="coloredRow">
                <span className="colum">Username : </span>
                <span className="colum">
                    {client && client.username ? client.username : '-'}
                </span>
            </div>
            <div className="normalRow">
                <span className="colum">Password :</span>
                <span className="colum">
                    {client && client.password ? startFunc() : '-'}
                </span>
            </div>
            <div className="coloredRow">
                <span className="colum">Name :</span>
                <span className="colum">{client && client.name ? client.name : '-'}</span>
            </div>
            <div className="normalRow">
                <span className="colum">Email :</span>
                <span className="colum">{client && client.email ? client.email : '-'}</span>
            </div>
            <div className="coloredRow">
                <span className="colum">Phone number :</span>
                <span className="colum">{client && client.phone ? client.phone : '-'}</span>
            </div>
            {client && client.favoritePlace.length > 0 && (
                <div className="normalRow">
                    <span className="colum">Favorite regions :</span>
                    <span className="colum">{favoriteRegionsHook()}</span>
                </div>
            )}
        </div>
    </>)
}

export { Client }