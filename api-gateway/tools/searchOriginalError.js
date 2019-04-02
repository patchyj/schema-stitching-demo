export default function searchOriginalError(error) {
	// console.log(error);
	
	if (error.originalError) {
		return searchOriginalError(error.originalError);
	}
	if (error.errors) {
		console.log(error.errors);
		
		return error.errors.map(searchOriginalError)[0];
	}
	return error;
}
