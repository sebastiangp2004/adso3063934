import BtnBack from "../components/BtnBack";


function addpet() {
    return (
        <main id="Add" class="">
        <BtnBack />
        <form action="" >
          <label for="name">Name
            <input type="text" name="name" id="name" placeholder="Enter pet's name"/>
          </label>
          <label for="kind"> Kind
            <input type="text" name="kind" id="kind" placeholder="Enter pet's kind"/>
          </label>
          <label for="weight"> Weight
            <input type="number" name="weight" id="weight" placeholder="Enter pet's weight"/>
          </label>
          <label for="age"> Age
            <input type="number" name="age" id="age" placeholder="Enter pet's age"/>
          </label>
          <label for="breed"> Breed
            <input type="text" name="breed" id="breed" placeholder="Enter pet's breed"/>
          </label>
          <label for="location"> Location
            <input type="text" name="location" id="location" placeholder="Enter pet's location"/>
          </label>
          <label for="description"> Description
            <textarea name="description" id="description" placeholder="Enter pet's description"></textarea>
          </label>
          <div class="action">
            <button type="button" class="Add"> Add</button>
            <button type="button" class="btnCancel">
              Cancel
            </button>
          </div>
        </form>
      </main>
    )
}

export default addpet;