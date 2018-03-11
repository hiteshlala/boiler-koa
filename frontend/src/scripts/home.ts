

function init_home( data ): void {
  if ( data.message ) {
    let msgbox = document.getElementById( 'error-msg' )
    msgbox.innerHTML = `<p>Error: ${data.message}</p>`;
    msgbox.classList.remove( 'hide' );
    msgbox.classList.add( 'show' );
  }
}
