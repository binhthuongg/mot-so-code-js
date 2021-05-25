import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
							window.fbAsyncInit = function() {
								FB.init({
								xfbml            : true,
								version          : 'v10.0'
								});
							};
					
							(function(d, s, id) {
							var js, fjs = d.getElementsByTagName(s)[0];
							if (d.getElementById(id)) return;
							js = d.createElement(s); js.id = id;
							js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
							fjs.parentNode.insertBefore(js, fjs);
							}(document, 'script', 'facebook-jssdk'));
              			`,
                    }}
                />

                <body className='22232'>
                    <Main />
                    <NextScript />
                    <div id='fb-root'></div>
                    <div
                        className='fb-customerchat'
                        attribution='setup_tool'
                        page_id='103025094966907'
                    ></div>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
