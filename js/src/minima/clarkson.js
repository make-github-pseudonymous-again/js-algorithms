
/**
 * Output sensitive inplace algorithm to find the minima set of a set S of
 * elements according to some partial order.
 *
 * Uses at most 2nA comparisons where A is the cardinality of the minima set.
 *
 * For (1), at most nA comparisons are used since we compare each element of S
 * with each elements of the minima set which is of cardinality at most A
 * during the execution of the algorithm.
 *
 * For (2), for each executed loop we
 * obtain a new minimum and increase the size of the constructed minima set by
 * 1, hence there are at most A loops execution, each of which loops over at
 * most n elements. (2) uses thus at most nA comparisons.
 *
 * The running time is dominated by the comparison time and thus the complexity
 * of this algorihtm is O(nA).
 *
 * Description and context in
 * ------------------------------------------
 * More Output-Sensitive Geometric Algorithms.
 * -------------------- Kenneth L. Clarkson -
 */

var clarkson = function ( prec , a , i , j ) {

	//
	// This algorithms reorganizes the input array `a` as follows
	//  - elements that are minima are put at the front of `a`
	//  - other elements are put at the back of `a`
	//
	// During the algorithm, `a` looks like this
	//
	//  ------------------------------------------------------
	// | minima set | candidate elements | discarded elements |
	//  ------------------------------------------------------
	//  i           min                dis                     j

	var min = i ;
	var dis = j - 1 ;

	// While there are candidate elements left.

	while ( min <= dis ) {

		// (1) Determine if the right-most candidate should be discarded because it
		// is dominated by one of the minima elements of the minima set in
		// construction.

		for ( k = i ; k < min && !prec( k , dis ) ; ++k ) ;

		// If so, discard it.

		if ( k < min ) --dis ;

		// (2) Otherwise, scan the candidates for a minimum. If at this point the
		// candidate set is not empty, at least one of its elements must be a
		// minimum. We scan the candidate list to find such a minimum.

		else {

			// Store the current minimum as the left-most candidate.

			swap( dis , min ) ;

			// For each other candidate, right-to-left.

			for ( inc = min + 1 ; inc <= dis ; ) {

				// If the current minimum precedes the right-most candidate,
				// discard the right-most candidate.

				if ( prec( min , dis ) ) --dis ;

				// Else, if the right-most candidate precedes the current
				// minimum, we can discard the current minimum and the
				// right-most candidate becomes the current minimum.

				else if ( prec( dis , min ) ) swap( dis-- , min ) ;

				// Otherwise, we save the candidate for the next round.

				else swap( dis , inc++ ) ;

			}

			// The above loop selects a new minimum from the set of candidates
			// and places it at position `min`. We now increase the `min`
			// counter to move this minimum from the candidate list to the
			// minima set.

			++min ;

		}

	}

	// The algorithm returns the outer right bound of the minima set a[i:min].

	return min ;

} ;

exports.clarkson = clarkson ;
