const Client = ({ client }: { client: any }) => {
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
                    {client && client.password ? client.password : '-'}
                </span>
            </div>
            <div className="coloredRow">
                <span className="colum">Name :</span>
                <span className="colum">{client && client.Name ? client.Name : '-'}</span>
            </div>
            <div className="normalRow">
                <span className="colum">Email :</span>
                <span className="colum">{client && client.Email ? client.Email : '-'}</span>
            </div>
            <div className="coloredRow">
                <span className="colum">Phone number :</span>
                <span className="colum">{client && client.phone ? client.phone : '-'}</span>
            </div>
        </div>
    </>)
}

export { Client }