function Footer() {
    const style = {
        marginRight: '5em'
    }
    return (
        <footer className="footer">
            <div className="container-fluid d-flex justify-content-between">
                <span className="text-muted d-block text-center text-sm-start d-sm-inline-block">© 2021. Powered by <a href="https://www.boscosofttech.com/" target="_blank">Boscosoft Technologies</a> | All Rights Reserved.</span>
                <span className="float-none float-sm-end mt-1 mt-sm-0 text-end"><a href="https://www.boscosofttech.com/terms-of-use" target="_blank">Terms of Use</a></span>
                <span className="float-none float-sm-end mt-1 mt-sm-0 text-end"><a href="https://www.boscosofttech.com/privacy-policy" target="_blank">Privacy Policy</a></span>
            </div>
        </footer>
    );
}

export default Footer;