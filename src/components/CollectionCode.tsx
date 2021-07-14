import copyImg from '../assets/images/copy.svg';

import '../styles/collection-code.scss';

type CollectionCodeProps = {
  code: string;
}

export function CollectionCode(props: CollectionCodeProps) {
  function copyCollectionCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className="collection-code" onClick={copyCollectionCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy collection code" />
      </div>
      <span>Coleção #{props.code}</span>
    </button>
  )
}