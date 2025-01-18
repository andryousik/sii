const ImageModal = ({ imageSrc, altText, tags = [], onClose }) => (
  <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="image-container">
              <img src={imageSrc} alt={altText} />
          </div>
          <div className="tags-container">
              {tags.length > 0 ? (
                  tags.map((tag, index) => (
                      <span key={index} className="tag">
                          {tag.name}
                      </span>
                  ))
              ) : (
                  <span>No tags available</span>
              )}
          </div>
      </div>
  </div>
);

export default ImageModal;
