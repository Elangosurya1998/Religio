function Footer() {
    const style = {
        marginRight: '5em'
    }
    return (
        <footer className="footer">
            <div className="container-fluid d-flex justify-content-between">
                <span className="text-muted d-block text-center text-sm-start d-sm-inline-block">Copyright © Boscosofttech.com 2023</span>
                <span className="float-none float-sm-end mt-1 mt-sm-0 text-end" style={    style}><a href="https://boscosofttech.com/" target="_blank">Designed By</a> from Boscosoft Technologies</span>
            </div>
        </footer>
    );
}

export default Footer;