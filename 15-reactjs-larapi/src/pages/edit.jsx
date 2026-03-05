import BtnBack from "../components/BtnBack";

function edit() {
    return (
        <main id="Edit" class="">
        <BtnBack />
        <form action="">
          <label for="Name">Name
            <input type="text" name="name" id="name" placeholder="Firulais"/>
          </label>
          <label for="kind"> Kind
            <input type="text" name="kind" id="kind" placeholder="Dog"/>
          </label>
          <label for="weight"> Weight
            <input type="number" name="weight" id="weight" placeholder="10 kg"/>
          </label>
          <label for="age"> Age
            <input type="number" name="age" id="age" placeholder="2 years"/>
          </label>
          <label for="breed"> Breed
            <input type="text" name="breed" id="breed" placeholder="Golden Retriever"/>
          </label>
          <label for="location"> Location
            <input type="text" name="location" id="location" placeholder="Manizales"/>
          </label>
          <label for="description"> Description
            <textarea name="description" id="description" placeholder="It is a friendly and loyal dog."></textarea>
          </label>
          <div class="action">
            <button type="button" class="btnEdit">Edit</button>
            <button type="button" class="btnCancel">
              Cancel
            </button>
          </div>
        </form>
      </main>
    )
}

export default edit;